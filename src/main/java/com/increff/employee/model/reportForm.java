package com.increff.employee.model;

import java.time.ZonedDateTime;

public class reportForm {

	private ZonedDateTime from;
	private ZonedDateTime to;
	private String brand;
	private String category;
	
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public ZonedDateTime getFrom() {
		return from;
	}
	public void setFrom(ZonedDateTime from) {
		this.from = from;
	}
	public ZonedDateTime getTo() {
		return to;
	}
	public void setTo(ZonedDateTime to) {
		this.to = to;
	}

}
