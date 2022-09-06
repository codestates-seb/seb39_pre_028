package com.team_28.StackOverFlow.jwt.global;

//@RestControllerAdvice
//public class GlobalExceptionHandler {
//
//    // Refresh Token 만료
//    @ExceptionHandler(TokenExpiredException.class)
//    public ResponseEntity<ErrorResponse> refreshTokenExpiredException() {
//        ErrorResponse errorResponse = new ErrorResponse(401, "Refresh Token이 만료되었습니다. 다시 로그인을 진행하여 Token을 갱신해주세요.");
//        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
//    }
//
//    // 잘못된 Refresh Token
//    @ExceptionHandler(JWTVerificationException.class)
//    public ResponseEntity<ErrorResponse> refreshTokenVerificationException() {
//        ErrorResponse errorResponse = new ErrorResponse(400, "유효하지 않은 Refresh Token 입니다.");
//        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
//    }
//}
