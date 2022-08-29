package com.team_28.StackOverFlow.jwt.filter;

public class JwtConstants {

    public static final long MINUTE = 1000 * 60;
    public static final long HOUR = 60 * MINUTE;
    public static final long DAY = 24 * HOUR;
    public static final long MONTH = 30*DAY;

    public static final long ACCESS_TOKEN_EXP = 1 * MINUTE;
    public static final long REFRESH_TOKEN_EXP = 10 * MINUTE;

    //secret
    public static final String JWT_SECRET = "jwt_secret_key_Team_28";

    //header
    public static final String ACCESS_TOKEN_HEADER = "accesstoken";
    public static final String REFRESH_TOKEN_HEADER = "refreshtoken";
    public static final String TOKEN_HEADER_PREFIX = "Bearer ";
}
