import { Entity, Column, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { UsersClubsEntity } from "./user_club.entity";

@Entity("users")
export class UsersEntity {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 100 })
  password: string;

  @OneToMany(
    () => UsersClubsEntity,
    (UsersClubsEntity) => UsersClubsEntity.club
  )
  user_clubs: UsersClubsEntity;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
