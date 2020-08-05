package com.cognixia.jump.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cognixia.jump.model.Restaurant;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long>{
	
	@Query("select r from Restaurant r where r.delivery = true")
	List<Restaurant> restaurantsThatDeliver();
	
	@Query("select r from Restaurant r where r.outdoorSeating = true")
	List<Restaurant> restaurantsWithOutdoorSeating();
}
