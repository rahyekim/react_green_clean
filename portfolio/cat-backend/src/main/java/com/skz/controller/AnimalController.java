package com.skz.controller;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skz.jpa.Animal;
import com.skz.repository.AnimalRepository;


@RestController //
/*이 클래스가 html 화면을 보여주는 것이 아니라, 
 * 데이터(json 형태)를 프론트엔드에
전달해주는 REST API 전용 컨트롤러임을 선언*/
@RequestMapping("/api/animals")
@CrossOrigin(origins="http://localhost:3000") //next.js만 허용

public class AnimalController {

	private final AnimalRepository animalRepository;
/*데이터 베이스와 통신할 Repository 객체를 담아둘 공간임 / 중간에 변경되지않도록 final 선언*/
	
	//자동으로 데이터베이스 통신 객체(Repository)를 주입(연결) 해주는 생성자
	public AnimalController(AnimalRepository animalRepository) {
		this.animalRepository = animalRepository;
		//넘겨받을 Repository 객체를 이 클래스 전역에서 쓸수 있게 변수에 저장
	}
	
	@GetMapping("/recomended")
	public List<Animal> getRecommendedAnimals(){
		return animalRepository.findAll();
	}
	//여러마리의 동물정보(animal)이 담긴 리스트(List)를 주는 메서드정의//?????
	
	
	
}
