package com.yashasini.VideoResume.VideoResumeApp;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User,String>{

}
