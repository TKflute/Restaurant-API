package com.cognixia.jump.model;

import java.io.Serializable;

import javax.persistence.*;

@Entity
public class Restaurant implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id  // -> primary key
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	public Restaurant() {
		this(-1L, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", false, false, "N/A");
	}
	
	public Restaurant(Long id, String name, String address, String city, String state, String zip, String neighborhood,
			boolean delivery, boolean outdoorSeating, String imageURL) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.city = city;
		this.state = state;
		this.zip = zip;
		this.neighborhood = neighborhood;
		this.delivery = delivery;
		this.outdoorSeating = outdoorSeating;
		this.imageURL = imageURL;
	}

	// don't really need any Column annotations...do I need them for project
	// requirements?
	private String name;
	private String address;
	private String city;
	private String state;
	private String zip;
	private String neighborhood;
	private boolean delivery;
	private boolean outdoorSeating;
	private String imageURL;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getNeighborhood() {
		return neighborhood;
	}

	public void setNeighborhood(String neighborhood) {
		this.neighborhood = neighborhood;
	}

	public boolean isDelivery() {
		return delivery;
	}

	public void setDelivery(boolean delivery) {
		this.delivery = delivery;
	}

	public boolean isOutdoorSeating() {
		return outdoorSeating;
	}

	public void setOutdoorSeating(boolean outdoorSeating) {
		this.outdoorSeating = outdoorSeating;
	}

	public String getImageURL() {
		return imageURL;
	}

	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}
	
	public static long getSerialversionUID() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "Restaurant [id=" + id + ", name=" + name + ", address=" + address + ", city=" + city + ", state="
				+ state + ", zip=" + zip + ", neighborhood=" + neighborhood + ", delivery=" + delivery
				+ ", outdoorSeating=" + outdoorSeating + ", imageURL=" + imageURL + "]";
	}
	
}
