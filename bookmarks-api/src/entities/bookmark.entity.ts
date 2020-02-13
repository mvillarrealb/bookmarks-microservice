import { Entity, Column, PrimaryColumn } from 'typeorm';
import { BookMark as BookMarkParent } from 'bookmarks-domain/src/domain';
import { Category as CategoryEntity } from './category.entity';

@Entity()
export class BookMark extends BookMarkParent {
    @PrimaryColumn()
    bookmarkId: string;
    @Column()
    title: string;
    @Column()
    url: string;
    thumbnail: Buffer;
    category: CategoryEntity;
    @Column()
    tags: Map<string, string>;
    @Column()
    createdAt: Date;
    @Column()
    updatedAt: Date;
}
