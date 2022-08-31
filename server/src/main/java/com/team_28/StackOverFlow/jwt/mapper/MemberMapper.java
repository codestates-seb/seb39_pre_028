package com.team_28.StackOverFlow.jwt.mapper;

import com.team_28.StackOverFlow.jwt.dto.SigninDto;
import com.team_28.StackOverFlow.jwt.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    SigninDto memberToSigninDto(Member member);
    Member signinDtoToMember(SigninDto signinDto);
}
