package com.aurora.recommender;

public class Pair<E,V> {
	E key;
	V value;
	
	Pair(E key, V value){
		this.key = key;
		this.value = value;
	}
	
	public V getValue(){
		return value;
	}
	
	public E getKey(){
		return key;
	}
}
