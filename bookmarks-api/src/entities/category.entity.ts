import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Category as CategoryParent } from 'bookmarks-domain/src/domain';
@Entity()
export class Category extends CategoryParent {
    @PrimaryColumn()
    categoryId: string;
    @Column()
    title: string;
    @Column()
    description?: string;
    thumbnail?: Buffer;
    @Column()
    createdAt: Date;
}
