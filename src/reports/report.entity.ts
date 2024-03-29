import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { User } from 'src/users/user.entity';


@Entity()

export class Report {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    // make, model, year, mileage, latitude, longtitude

    @Column( { default: false})
    approved: boolean; 

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    lng: string

    @Column()
    lat: string;

    @Column()
    mileage: number;


    @ManyToOne(()=> User, (user)=> user.reports)
    user: User;

}