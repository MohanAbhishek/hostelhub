package com.hostelhub.backend.dto.hostel;


	import com.hostelhub.backend.enums.AccommodationType;
	import com.hostelhub.backend.enums.RoomType;
	import jakarta.validation.constraints.Min;
	import jakarta.validation.constraints.NotBlank;
	import lombok.Data;

	@Data
	public class UpdateHostelRequest {

	    @NotBlank(message = "Hostel name is required")
	    private String name;

	    @NotBlank(message = "Address is required")
	    private String address;

	    @NotBlank(message = "City is required")
	    private String city;

	    @NotBlank(message = "State is required")
	    private String state;

	    @NotBlank(message = "Description is required")
	    private String description;

	    @Min(value = 1, message = "Total rooms must be at least 1")
	    private Integer totalRooms;

	    @Min(value = 0, message = "Available rooms cannot be negative")
	    private Integer availableRooms;

	    private RoomType roomType;

	    private AccommodationType accommodationType;

	    @Min(value = 0, message = "Price cannot be negative")
	    private Double pricePerMonth;
	}

