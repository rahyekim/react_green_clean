
const {EntitySchema} = require('typeorm');

module.exports = new EntitySchema({
    name: 'FooterSettings',
    tableName:'FOOTER_SETTINGS',
    columns:{
        id:{primary:true, type:'number', name:'ID'},
        name: { type: 'varchar2', length: 100, nullable: false, name: 'NAME' }, // 이름도 대문자 지정 추천
        address: { type: 'varchar2', length: 255, nullable: false, name: 'ADDRESS' },
        clinicName: { type: 'varchar2', length: 100, nullable: false, name: 'CLINICNAME' },
        phone: { type: 'varchar2', length: 50, nullable: false, name: 'PHONE' },
        email: { type: 'varchar2', length: 100, nullable: false, name: 'EMAIL' },
        locationUrl: { type: 'varchar2', length: 255, nullable: false, name: 'LOCATIONURL' },
        schedules: { type: 'simple-json', nullable: false, name: 'SCHEDULES' },
        familySites: { type: 'simple-json', nullable: false, name: 'FAMILYSITES' }
    }
})

// TypeORM이 오라클에 맞게 알아서 VARCHAR2로 찰떡같이 변환
/*
 아, 이건 내부적으로 CLOB(문자열)로 저장하되, 
 자바스크립트 쪽으로 전달할 때는 알아서 JSON.parse와 JSON.stringify를 
 대신 해줘야겠다!" 하고 중간에서 번역기를 돌려줌.
 */