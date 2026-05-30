package estudante.ubiracy.palmassemburacos.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import estudante.ubiracy.palmassemburacos.model.CityBlock;
import org.locationtech.jts.geom.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ScraperService {
    private final CityBlockService service;

    // Fábrica geométrica padrão do JTS usando SRID 4326 (padrão global de GPS/WGS84 usado pelo Google Maps)
    private final GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);

    public ScraperService(CityBlockService service) {
        this.service = service;
    }

    @Transactional
    public void runPythonGeoScraper() {
        try {
            String pythonPath = "python3";
            String scriptPath = "Locais.py";

            ProcessBuilder pb = new ProcessBuilder(pythonPath, scriptPath);
            Process process = pb.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder jsonOutput = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                jsonOutput.append(line);
            }

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                System.err.println("O script Python falhou. Código: " + exitCode);
                return;
            }

            ObjectMapper mapper = new ObjectMapper();
            File jsonFile = new File("data/results.json");

            ArrayList<Map<String, Object>> blocksData = mapper.readValue(
                    jsonFile,
                    new TypeReference<ArrayList<Map<String, Object>>>() {}
            );

            for (Map<String, Object> data : blocksData) {
                String idPlace = (String) data.get("id_place");
                String region = (String) data.get("region");
                String nameRaw = (String) data.get("name");
                String rawCoordinatesStr = (String) data.get("coordinate");

                if (rawCoordinatesStr == null || rawCoordinatesStr.isBlank()) continue;

                // 2. PARSING DO GEOPALMAS: Divide os pontos pelo caractere de espaço em branco
                String[] coordinatePairs = rawCoordinatesStr.trim().split("\\s+");
                List<Coordinate> jtsCoords = new ArrayList<>();

                for (String pair : coordinatePairs) {
                    // Cada par vem no formato "longitude,latitude,altitude" (Ex: "-48.33035,-10.1750949,0.0")
                    String[] parts = pair.split(",");
                    if (parts.length >= 2) {
                        double lng = Double.parseDouble(parts[0]);
                        double lat = Double.parseDouble(parts[1]);

                        // JTS opera no formato (X = Longitude, Y = Latitude)
                        jtsCoords.add(new Coordinate(lng, lat));
                    }
                }

                // REGRA DO JTS POLYGON: O primeiro ponto e o último ponto precisam ser matematicamente idênticos
                if (!jtsCoords.isEmpty() && !jtsCoords.get(0).equals2D(jtsCoords.get(jtsCoords.size() - 1))) {
                    jtsCoords.add(jtsCoords.get(0)); // Fecha o anel automaticamente se o GeoPalmas falhar
                }

                // 3. Converte na estrutura nativa de Geometria do MySQL
                Coordinate[] coordsArray = jtsCoords.toArray(new Coordinate[0]);
                LinearRing shell = geometryFactory.createLinearRing(coordsArray);
                Polygon cityBlockPolygon = geometryFactory.createPolygon(shell, null);

                // 4. Higieniza o nome comercial conforme o seu padrão
                String cleanName = nameRaw;
                if (nameRaw.contains("(")) {
                    // Isola o nome amigável de Palmas de dentro dos parênteses (Ex: "202 N")
                    cleanName = nameRaw.substring(nameRaw.indexOf("(") + 1, nameRaw.indexOf(")")).trim();
                }

                // 5. Persiste no repositório MySQL
                CityBlock block = service.findByIdPlace(idPlace).orElse(new CityBlock());
                block.setIdPlace(idPlace);
                block.setRegion(region);
                block.setName(cleanName);
                block.setCoordinate(cityBlockPolygon);

                service.save(block);
            }

            System.out.println("Carga de Polígonos GeoPalmas concluída e persistida no MySQL!");

        } catch (Exception e) {
            System.err.println("Falha catastrófica na persistência geométrica: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
