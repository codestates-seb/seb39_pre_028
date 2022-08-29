package com.team_28.StackOverFlow.jwt.repository;

import com.team_28.StackOverFlow.jwt.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    public Member findByUsername(String member);
    public Member findByUserid(String member);
    public boolean existsByUserid(String userID);
}
