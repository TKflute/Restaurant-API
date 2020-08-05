package com.cognixia.jump.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cognixia.jump.model.Restaurant;
import com.cognixia.jump.repository.RestaurantRepository;

@RequestMapping("/api")
@RestController
public class RestaurantController {

	@Autowired
	RestaurantRepository service;
	
	@GetMapping("/restaurants")
	public List<Restaurant> getAllRestaurants(){
		return service.findAll();
	}
	
	@GetMapping("/restaurants/{id}")
	public Restaurant getRestaurant(@PathVariable long id) {
		
		Optional<Restaurant> restaurant = service.findById(id);
		
		if(restaurant.isPresent()) {
			return restaurant.get();
		}
		
		return new Restaurant();
	}
	
	//may need to do custom queries for these
//	@GetMapping("/restaurants/neighborhood/{neighborhood}")
//	public List<Restaurant> getRestaurantsByNeighborhood(@PathVariable String neighborhood){
//		return service.getRestaurantsByNeighborhood(neighborhood);
//	}
	
	@GetMapping("/restaurants/delivery")
	public List<Restaurant> getRestaurantsThatDeliver(){
		return service.restaurantsThatDeliver();
	}
	
	@GetMapping("/restaurants/outdoor")
	public List<Restaurant> getRestaurantsWithOutdoorSeating(){
		return service.restaurantsWithOutdoorSeating();
	}
	
	@PostMapping("/add/restaurant")
	// TODO: Per project req, need to return something in body
	public void addRestaurant(@RequestBody Restaurant newRestaurant) {
		
		// make sure we don't override an existing Restaurant by accidentally updating
		newRestaurant.setId(-1L);
		Restaurant added = service.save(newRestaurant);  // save() does an insert or update, depending on id
		System.out.println(added);
	}
	
	@PutMapping("/update/restaurant")
	public @ResponseBody String updateRestaurant(@RequestBody Restaurant updateRestaurant) {
		
		// check if restaurant exists, if so, then update	
		Optional<Restaurant> found = service.findById(updateRestaurant.getId());
		
		if(found.isPresent()) {
			service.save(updateRestaurant);
			return "Saved: " + updateRestaurant.toString();
		}else {
			return "Could not update restaurant, the id = " + updateRestaurant.getId() + " doesn't exist";
		}
	}
	
	// don't really need this but want to test Patch
	@PatchMapping("update/restaurant/imageURL")
	public @ResponseBody String updateImageURL(@RequestBody Map<String, String> imageURLInfo) {
		
		long id = Long.parseLong(imageURLInfo.get("id"));
		String imageURL = imageURLInfo.get("imageURL");
		
		Optional<Restaurant> found =  service.findById(id);
		
		if(found.isPresent()) {
			Restaurant toUpdate = found.get();
			
			String old = toUpdate.getImageURL();
			toUpdate.setImageURL(imageURL);
			service.save(toUpdate);
			
			return "Old ImageURL: " + old + "\nNew ImageURL: " + imageURL;
		}else {
			return "Could not update imageURL, restaurant with id = " + id + " doesn't exist";
		}
		
	}
	
	@DeleteMapping("/delete/restaurant/{id}")
	public ResponseEntity<String> deleteRestaurant(@PathVariable long id){
		
		Optional<Restaurant> found = service.findById(id);
		
		if(found.isPresent()) {
			service.deleteById(id);
			return ResponseEntity.status(200).body("Deleted restaurant w/ id of : " + id);
		}else {
			return ResponseEntity.status(400)
					.header("id", id + "")
					.body("Restaurant with id of: " + id + " not found");
		}
		
	}
}
