package com.yashasini.VideoResume.VideoResumeApp;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JsonController {

    @GetMapping("/json/version")
    public ResponseEntity<String> getVersion() {
       
        return ResponseEntity.ok("Your JSON version information");
    }

    @GetMapping("/json/list")
    public ResponseEntity<String> getListData() {
       
        return ResponseEntity.ok("Your JSON list data");
    }
}
