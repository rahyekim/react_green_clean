package com.skz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skz.entity.Animal;

public interface AnimalRepository extends JpaRepository<Animal,Long> { //<table명,pk>

	
}
