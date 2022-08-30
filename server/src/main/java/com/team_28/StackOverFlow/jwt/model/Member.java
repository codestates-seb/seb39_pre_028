package com.team_28.StackOverFlow.jwt.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.*;

@Data
@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberid;
    private String userid;
    private String username;
    private String password;
    private String roles;

    public List<String> getRoleList() {
        if(this.roles.length() > 0){
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }
    //private String refreshToken;
    //public void updateRefreshToken(String newToken){
        //this.refreshToken = newToken;
    //}
}
