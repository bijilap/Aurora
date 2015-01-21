package com.aurora.recommender;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.impl.model.jdbc.MySQLJDBCDataModel;
import org.apache.mahout.cf.taste.impl.neighborhood.NearestNUserNeighborhood;
import org.apache.mahout.cf.taste.impl.recommender.CachingRecommender;
import org.apache.mahout.cf.taste.impl.recommender.GenericUserBasedRecommender;
import org.apache.mahout.cf.taste.impl.similarity.PearsonCorrelationSimilarity;
import org.apache.mahout.cf.taste.model.DataModel;
import org.apache.mahout.cf.taste.model.JDBCDataModel;
import org.apache.mahout.cf.taste.neighborhood.UserNeighborhood;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
import org.apache.mahout.cf.taste.recommender.Recommender;
import org.apache.mahout.cf.taste.similarity.UserSimilarity;

import com.aurora.data.DBConfig;
import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;

public class RecommendItem implements DBConfig{
	
	DataModel model;
	
	public JDBCDataModel getJDBCDataModel(String tableName, String userIdField, String itemIdField, String ratingField){
	
		MysqlDataSource dataSource = new MysqlDataSource();
		dataSource.setServerName(dbHost);
		dataSource.setUser(dbUser);
		dataSource.setPassword(dbPassword);
		dataSource.setDatabaseName(dbDatabase);
		
		JDBCDataModel dataModel = new MySQLJDBCDataModel(
			    dataSource, tableName, userIdField,
			    itemIdField, ratingField, null);
		
		return dataModel;
	}
	
	public ArrayList<Pair<Long, Float>> getRecommendation(long userid, int k) throws IOException, TasteException{
		
		UserSimilarity userSimilarity = new PearsonCorrelationSimilarity(model);
		UserNeighborhood neighborhood =
			      new NearestNUserNeighborhood(k, userSimilarity, model);
	    //UserNeighborhood neighborhood = new ThresholdUserNeighborhood(0.1, userSimilarity, model);
		Recommender recommender =
				  new GenericUserBasedRecommender(model, neighborhood, userSimilarity);
				Recommender cachingRecommender = new CachingRecommender(recommender);
		List<RecommendedItem> recommendations =
				  cachingRecommender.recommend(userid, k);
		ArrayList<Pair<Long, Float>> recommendedList = new ArrayList<Pair<Long,Float>>();
		for(RecommendedItem reci:recommendations){
			Pair<Long, Float> pair = new Pair<Long, Float>(reci.getItemID(), reci.getValue());
			recommendedList.add(pair);
		}
		
		return recommendedList;
		
	}
	
}
