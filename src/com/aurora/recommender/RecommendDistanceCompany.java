package com.aurora.recommender;

public class RecommendDistanceCompany extends RecommendItem{
	
	public RecommendDistanceCompany(){
		super();
		model = getJDBCDataModel("DISTANCE_COMPANY_PREFERENCE", "USERID",
			    "METRICID", "RATING");
	}
}
