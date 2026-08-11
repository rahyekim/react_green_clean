package com.skz.entity;
/*
기본회원(Member)테이블에 데이터가 있고
관리자 권한을 부여받은 사람만 admin 테이블에 조인(join) 시켜서 관리자 전용으로
로그인하게 만들겠다

회원정보(비밀번호,이름 등) 은 Member에 일원화하고 Amine테이블은 관리자 등급이나
부서같은 전용데이터만 가지면서 Member를 부모로 참조(외래키) 하는 것
JPA 의 @OneToOne(또는 다대일) 조인을 사용하면 이 구조를 아주 우아하게 구현할수있다.
*/

import jakarta.persistence.*; //데이터베이스를 쉽게 다룰수있게 해주는도구(JPA)들을 불러옴
import lombok.*; //코드를 획기적으로 줄여주는 도구

@Entity //테이블이다
@Table(name = "admins")
@Data //Lombok이 제공하는 기능 getter,setter 다 만들어줌
@NoArgsConstructor //파라미터가없는기본생성자(텅빈기본껍데기)
//DB에서 값을 꺼내올때 JPA가 꼭 필요...
public class Admin {

    @Id //pk 번호를 안매겨도 자동생성...
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //관리자 테이블 전용 고유 번호

    //핵심: Member테이블의 id를 외래키(member_id)로 가져와서 완벽하게 조인!
    @OneToOne(fetch = FetchType.LAZY)
    /*
    * 관리자(Admin) 1명은 회원(Member) 1명과 딱 짝꿍-> 1:1 관계
    * FetchType.LAZY 지연로딩: 관리자정보만 필요할때는 회원정보까지 무겁게 다 끌고 오지 말고
    *  진짜 회원정보가 필요해질때만 나중에 가져오라는 성능 최적화 마법
    * */
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(length = 20)
    private String adminLevel;

    private String department;


//    @Column(nullable = false, unique = true, length = 100)
//    private String email;

//    @Column(nullable = false, length = 255)
//    private String password;

//    @Column(nullable = false, length = 50)
//    private String name;
//
//    @Builder
//    public Admin(String email, String password, String name) {
//        this.email = email;
//        this.password = password;
//        this.name = name;
//    }

}
