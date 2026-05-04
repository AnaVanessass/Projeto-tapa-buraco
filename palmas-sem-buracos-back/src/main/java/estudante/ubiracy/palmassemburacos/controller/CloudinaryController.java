package estudante.ubiracy.palmassemburacos.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api/cloudinary")
public class CloudinaryController {
    @Value("${cloudinary.cloudname}")
    private String cloudName;
    @Value("${cloudinary.api-key}")
    private String apiKey;
    @Value("${cloudinary.api-secret}")
    private String apiSecret;

    @PostMapping("/sign")
    public Map<String, Object> generateSignature(@RequestBody Map<String, Object> paramsToSign) {
        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        ));

        long timestamp = System.currentTimeMillis() / 1000L;
        paramsToSign.put("timestamp", timestamp);

        // Gera a assinatura baseada nos parâmetros (ex: folder, tags, etc)
        String signature = cloudinary.apiSignRequest(paramsToSign, apiSecret, 1);

        return ObjectUtils.asMap(
                "signature", signature,
                "timestamp", timestamp
        );
    }
}
