import {
    Entity, Column, PrimaryGeneratedColumn
} from 'typeorm';
import { Timestamp } from 'typeorm/driver/mongodb/bson.typings.js';

@Entity("SITE_THEME_TB")
export class SiteTheme {
    @PrimaryGeneratedColumn({name:"THEME_IDX"})
    themeIdx!: number;


    @Column({name:"PRIMARY_TONE", type:'varchar2', length:50, default:"'BLUE'"})
    primaryTone!: string;
    
    //다크모드 여부
    @Column({name:"IS_DARK_MODE", type:"char", length:1, default:"'N'"})
    idDarkMode!: string;

    @Column({name:'UPDATED_AT', type:"Timestamp", default:()=>"CURRENT_TIMESTAMP"})
    updatedAt!:Date;
}
    
