package com.skz.service;

import com.skz.DTO.ShelterAnimalRequest;
import com.skz.entity.ShelterAnimal;
import com.skz.repository.ShelterAnimalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ShelterAnimalService {
    private final ShelterAnimalRepository shelterAnimalRepository;


    /*
    * 메서드 안의 작업을을 하나의 '트랜잭션'으로 묶습니다
    * 작업중 하나라도 실패하면 모든변경사항을 원상태로 롤백해 DB를 안전하게 유지
    * */

    @Transactional
    public void registerShelterAnimal(ShelterAnimalRequest dto){
        //최종적으로 DB에 저장할 이미지 주소를 담을 변수
        //사용자가 폼에서 링크로 입력했을 경우를 대비해 우선 그값으로 초기화

        String finalImageUrl = dto.getImageUrl();

        //프론트엔드에서 폼 데이터로 넘어온 파일 객체를 꺼냄
        MultipartFile file = dto.getImageFile();

        if(file != null && !file.isEmpty()){
            try{
            /*현재실행중인 프로젝트의 최상단경로(user.dir)를 가져와
            '/uploads/'라는 폴더 경로를지정*/
                String projectPath = System.getProperty("user.dir") + "/uploads/";
                //위에서 만든 경로를 바탕으로 File 객체(폴더)를 생성
                File uploadDir = new File(projectPath);
            //만약 해당 폴더에 업로드폴더가 존재하지않는다면,
                if(!uploadDir.exists()){
                    uploadDir.mkdir();
                }
                //사용자가 올린 파일의 원래이름(고양이.jpg)을 가져옴
                String originalFileName = file.getOriginalFilename();
                //파일 이름이 겹쳐서 기존 파일이덮어씌워지는것을 막기위해
                //전세계 유일한 무작위 문자열(uuid)를 생성
                String uuid = UUID.randomUUID().toString();
                //1234abcd-5678_고양이.jpg(UUID+원래이름)
                String savedFileName = uuid + "_" + originalFileName;

                //최종저장할 폴더위치와 새 파일명을 합쳐서 파일저장용객체 만듦
                File savedFile = new File(uploadDir, savedFileName);
                //메모리에 입시로 올라와 있던 업로드 파일을 실제로 방금 만든 컴터의물리적 경로에 씀
                file.transferTo(savedFile);
                //서버에 실제 파일저장이 성공햇으니
                //DB에는 웹에서 해당 이미지를 불러올수 있는 접근경로(/uploads/파일명)로 덮어씌운다
                finalImageUrl = "/uploads/"+savedFileName;

            }catch (IOException e){

                throw new RuntimeException("파일업로드중 오류가 발생",e);
            }
        }
        //dto=> entity 변환 및 db저장
        ShelterAnimal animal = ShelterAnimal.builder()
                .status(dto.getStatus())
                .gender(dto.getGender())
                .breed(dto.getBreed())
                .noticeNo(dto.getNoticeNo())
                .regDate(dto.getRegDate())
                .rescueLocation(dto.getRescueLocation())
                .content(dto.getContent())
                .imageUrl(finalImageUrl)
                .build();
        shelterAnimalRepository.save(animal);

    }
    public List<ShelterAnimal> getAllAnimals(){
        return shelterAnimalRepository.findAll();
    }
}

