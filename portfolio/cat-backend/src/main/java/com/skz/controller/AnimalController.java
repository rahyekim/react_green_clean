package com.skz.controller;
import org.springframework.web.bind.annotation.*;


@RestController //
/*이 클래스가 html 화면을 보여주는 것이 아니라, 
 * 데이터(json 형태)를 프론트엔드에
전달해주는 REST API 전용 컨트롤러임을 선언*/
@RequestMapping("/api/animals")
@CrossOrigin(origins="http://localhost:3000") //next.js만 허용

public class AnimalController {

	
	
}
