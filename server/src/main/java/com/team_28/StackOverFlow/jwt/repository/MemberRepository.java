package com.team_28.StackOverFlow.jwt.repository;

import com.team_28.StackOverFlow.jwt.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    public Member findByMemberid(long member);
    public Member findByUserid(String member);
    public boolean existsByUserid(String userID);
}
