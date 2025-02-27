package com.sgp.erp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sgp.erp.dao.IAMarksDao;
import com.sgp.erp.dto.ResponseStructure;
import com.sgp.erp.exception.DataNotFoundException;
import com.sgp.erp.model.IAMarks;

@Service
public class IAMarksService {

    @Autowired
    private IAMarksDao iaMarksDao;

    public ResponseEntity<ResponseStructure<List<IAMarks>>> getByRegistrationNumber(String registrationNumber) {
        List<IAMarks> iaMarksList = iaMarksDao.getByRegistrationNumber(registrationNumber);
        if (iaMarksList.isEmpty()) {
            throw new DataNotFoundException("No IA Marks found for registration number: " + registrationNumber);
        }
        ResponseStructure<List<IAMarks>> response = new ResponseStructure<>();
        response.setData(iaMarksList);
        response.setMessage("IA Marks found successfully");
        response.setStatus(HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<ResponseStructure<List<IAMarks>>> getByRegistrationNumberAndSubject(
            String registrationNumber, String subjectName) {
        List<IAMarks> iaMarksList = iaMarksDao.getByRegistrationNumberAndSubject(registrationNumber, subjectName);
        if (iaMarksList.isEmpty()) {
            throw new DataNotFoundException("No IA Marks found for registration number: " + registrationNumber + " and subject: " + subjectName);
        }
        ResponseStructure<List<IAMarks>> response = new ResponseStructure<>();
        response.setData(iaMarksList);
        response.setMessage("IA Marks found successfully");
        response.setStatus(HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
