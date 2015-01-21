package com.aurora.recommender;


public class RecommendRestaurant extends RecommendItem{
	
	public RecommendRestaurant(){
		super();
		model = getJDBCDataModel("RESTAURANT_PREFERENCE", "USERID",
			    "ITEMID", "RATING");
	}
}
