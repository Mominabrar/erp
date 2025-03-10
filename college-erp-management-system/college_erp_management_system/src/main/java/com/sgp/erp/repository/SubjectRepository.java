package com.sgp.erp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sgp.erp.model.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Integer> {
    
}
