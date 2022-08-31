package com.team_28.StackOverFlow.jwt.service;

import com.team_28.StackOverFlow.jwt.dto.SignupDto;

public interface AccountService {
    Long saveAccount(SignupDto dto);
    Long saveRole(String roleName);
    Long addRoleToUser();

    //void updateRefreshToken(String userId, String refreshToken);

    //Map<String, String> refresh(String refreshToken);
}
