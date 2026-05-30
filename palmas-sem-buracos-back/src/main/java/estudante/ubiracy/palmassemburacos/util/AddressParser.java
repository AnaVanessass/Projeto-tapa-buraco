package estudante.ubiracy.palmassemburacos.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class AddressParser {
    /**
     * Extracts the Quadra portion from a raw Google Maps formatted address string.
     * @param formattedAddress The raw address string from the API.
     * @return The extracted Quadra string (e.g., "Quadra 104 Norte"), or null if not found.
     */
    public static String extractQuadra(String formattedAddress) {
        if (formattedAddress == null || formattedAddress.isEmpty()) {
            return null;
        }

        // Pattern matches Q, Q. or Quadra followed by spaces and everything until the next comma
        Pattern pattern = Pattern.compile("(?i)(Q\\.?|Quadra)\\s+([^,]+)");
        Matcher matcher = pattern.matcher(formattedAddress);

        return matcher.find() ? matcher.group(0).trim() : null;
    }
}

