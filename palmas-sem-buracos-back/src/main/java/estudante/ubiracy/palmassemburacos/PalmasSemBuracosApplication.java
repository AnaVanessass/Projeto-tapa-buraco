package estudante.ubiracy.palmassemburacos;

import estudante.ubiracy.palmassemburacos.service.ScraperService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PalmasSemBuracosApplication {

    public static void main(String[] args) {
        SpringApplication.run(PalmasSemBuracosApplication.class, args);
    }
//    @Bean
//    CommandLineRunner runScraper(ScraperService scraperService) {
//        return args -> {
//            System.out.println("Iniciando a carga de dados do GeoPalmas...");
//            scraperService.runPythonGeoScraper();
//        };
//    }

}
