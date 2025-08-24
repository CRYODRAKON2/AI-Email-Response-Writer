package com.email.writer.app;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class EmailGeneratorService {
    private final WebClient webClient;
    @Value("${gemini.api.url}")
    private String geminiApiurl;
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public EmailGeneratorService(WebClient.Builder webClientbuilder) {
        this.webClient = webClientbuilder.build();
    }

    public String GenerateEmailreply( EmailRequest emailRequest){
                String prompt=buildprompt(emailRequest);


        String response = webClient.post()
                .uri(geminiApiurl)
                .header("Content-Type", "application/json")
                .header("X-goog-api-key", geminiApiKey)
                .bodyValue(Map.of(
                        "contents", List.of(
                                Map.of("parts", List.of(
                                        Map.of("text", prompt)
                                ))
                        )
                ))
                .retrieve()
                .bodyToMono(String.class)
                .block();


    return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {
        try{
            ObjectMapper mapper=new ObjectMapper();
            JsonNode rootnode=mapper.readTree(response);
            return rootnode.path("candidates").get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text").asText();

        }catch(Exception e){
            return "Error processing request" + e.getMessage();
        }
    }

    private String buildprompt(EmailRequest emailRequest) {
        //building th prompt
        StringBuilder prompt= new StringBuilder();
        prompt.append("Generate a proffessional email reply for the following email content. Please dont generate a subject line");
        if( emailRequest.getTone()!=null && !emailRequest.getTone().isEmpty()){
            prompt.append("Use a").append(emailRequest.getTone()).append(" tone.");
        }
        prompt.append("\n Original Email: \n").append(emailRequest.getEmailcontent());
        return prompt.toString();

    }
}
