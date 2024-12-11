export interface BookingCreateDto {
    date: string;        
    startTime: string;   
    endTime: string;     
}
export interface BookingUpdateDto {
    date?: string;        
    startTime?: string;   
    endTime?: string;     
}
