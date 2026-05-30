package estudante.ubiracy.palmassemburacos.model.dto;

import java.util.List;

public record CityBlockResponse (String idPlace,
                                 String name,
                                 List<List<Double[]>> coordinates) {
}
