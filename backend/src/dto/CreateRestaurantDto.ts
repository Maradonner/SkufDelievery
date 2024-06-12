import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDto {
    @ApiProperty({ example: 'Restaurant Name' })
    name: string;

    @ApiProperty({ example: 4.5 })
    rating: number;

    @ApiProperty({ example: 'Italian' })
    type: string;

    @ApiProperty({ example: 'Open' })
    status: 'Open' | 'Closed';

    @ApiProperty({ example: 'http://example.com/image.jpg' })
    imageSrc: string;
}
