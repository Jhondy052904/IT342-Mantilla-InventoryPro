package edu.cit.mantilla.inventorypro.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthResponse {
    private boolean success;
    private ResponseData data;
    private ResponseError error;
    private String timestamp;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class ResponseData {
        private UserInfo user;
        private String accessToken;
        private String refreshToken;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class UserInfo {
        private String email;
        private String firstName;
        private String lastName;
        private String role;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class ResponseError {
        private String code;
        private String message;
        private Object details;
    }

    /**
     * Builder for success response with tokens
     */
    public static AuthResponse success(String accessToken, String refreshToken, String email, String firstName,
            String lastName, String role) {
        return AuthResponse.builder()
                .success(true)
                .data(ResponseData.builder()
                        .user(UserInfo.builder()
                                .email(email)
                                .firstName(firstName)
                                .lastName(lastName)
                                .role(role)
                                .build())
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build())
                .error(null)
                .timestamp(LocalDateTime.now().toString())
                .build();
    }

    /**
     * Builder for error response
     */
    public static AuthResponse error(String code, String message) {
        return AuthResponse.builder()
                .success(false)
                .data(null)
                .error(ResponseError.builder()
                        .code(code)
                        .message(message)
                        .details(null)
                        .build())
                .timestamp(LocalDateTime.now().toString())
                .build();
    }
}
