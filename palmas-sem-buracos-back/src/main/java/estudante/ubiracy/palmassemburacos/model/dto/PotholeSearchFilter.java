package estudante.ubiracy.palmassemburacos.model.dto;

import estudante.ubiracy.palmassemburacos.model.enums.PotholeStatus;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.time.YearMonth;

public record PotholeSearchFilter (
    String address,
    PotholeStatus status,
    String blockName,
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    LocalDateTime startDate,
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    LocalDateTime endDate
){
    public PotholeSearchFilter {
        YearMonth currentMonth = YearMonth.now();

        if (startDate == null) {
            startDate = currentMonth.atDay(1).atStartOfDay();
        }

        if (endDate == null) {
            endDate = currentMonth.atEndOfMonth().atTime(23, 59, 59, 999999999);
        }
    }
}
