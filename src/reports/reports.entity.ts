import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()

export class Report {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    // make, model, year, mileage, latitude, longtitude

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
    milege: number;

}