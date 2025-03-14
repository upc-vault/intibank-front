package pe.edu.upc.intibank.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.edu.upc.intibank.model.ResponseModel;
import pe.edu.upc.intibank.model.authentication.LoginRequestModel;
import pe.edu.upc.intibank.model.authentication.RegisterRequestModel;
import pe.edu.upc.intibank.service.AuthenticationService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<ResponseModel> register(@Valid @RequestBody RegisterRequestModel request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ResponseModel
                        .builder()
                        .status(HttpStatus.CREATED)
                        .success(true)
                        .data(authenticationService.register(request))
                        .build()
                );
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseModel> login(@Valid @RequestBody LoginRequestModel request) {
        return ResponseEntity.ok(
                ResponseModel
                        .builder()
                        .status(HttpStatus.OK)
                        .success(true)
                        .data(authenticationService.login(request))
                        .build()
        );
    }
}