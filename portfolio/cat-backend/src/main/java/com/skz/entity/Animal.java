package com.skz.entity;

import jakarta.persistence.*;
//DB 테이블과 자바 객체를 연결해주는 JPA 관련 기능 모두 불러옴
import lombok.Data;
//getter,setter 등을 자동으로 만들어주는 Lombok 라이브러리 불러옴

@Entity // 이클래스가 데이터베이스의 테이블(Animal)과 1:1로 매핑됨을 선언
@Data //Getter/Setter/toString 메서드 자동 생성
public class Animal {
	
	@Id //이 변수를 데이터베이스 테이블의 기본키(Primary Key, PK) 로 지정
	//데이터 추가될때마다 DB가 알아서번호를 1씩 증가시키도록(auto increment) 설정
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id; //동물을 식별하는 고유 번호(예: 1,2,3..)을 저장하는 정수형 변수
	
	private String region, noticeNo, birthYear, gender , imageUrl, category ;
	
	private Double weight;

}
