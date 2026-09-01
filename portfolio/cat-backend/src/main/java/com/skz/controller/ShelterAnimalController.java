package com.skz.controller;

import com.skz.DTO.ShelterAnimalRequest;
import com.skz.entity.Animal;
import com.skz.entity.ShelterAnimal;
import com.skz.service.ShelterAnimalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shelter-animals")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ShelterAnimalController {

    private final ShelterAnimalService shelterAnimalService;
    
    @PostMapping
    public ResponseEntity<String>registerAnimal(@ModelAttribute ShelterAnimalRequest dto){
        shelterAnimalService.registerShelterAnimal(dto);
        return ResponseEntity.ok("보호동물이 성공적으로 등록되었습니다");

    }
    @GetMapping
    public ResponseEntity<List<ShelterAnimal>> getAllAnimals(){
        List<ShelterAnimal> animals = shelterAnimalService.getAllAnimals();

        return  ResponseEntity.ok(animals);
    }
}

