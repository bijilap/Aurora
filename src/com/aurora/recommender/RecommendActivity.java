package com.aurora.recommender;

public class RecommendActivity extends RecommendItem{
	
	public RecommendActivity(){
		super();
		model = getJDBCDataModel("ACTIVITY_PREFERENCE", "USERID",
			    "ITEMID", "RATING");
	}
}
