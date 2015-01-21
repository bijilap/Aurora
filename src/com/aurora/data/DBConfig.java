package com.aurora.data;

public interface DBConfig {
    final String dbDriver = "com.mysql.jdbc.Driver";
    final String dbHost = "localhost";
    final String dbPort = "3306";
    final String dbUrl = "jdbc:mysql://"+dbHost+":"+dbPort+"/";
    final String dbDatabase = "AURORA";
    final String dbUser = "root";
    final String dbPassword = "password";
}
