package com.email.writer.app;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class EmailGeneratorController {
    private final EmailGeneratorService emailGeneratorService;
    @GetMapping("/ping")
    public String ping() {
        return "EmailController is alive!";
    }
    @PostMapping("/generate")
    public ResponseEntity<String> GenerateEmail(@RequestBody EmailRequest emailRequest){
        String response=emailGeneratorService.GenerateEmailreply(emailRequest);
        return ResponseEntity.ok(response);


    }
}
