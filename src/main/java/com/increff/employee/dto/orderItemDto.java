package com.increff.employee.dto;
 
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.increff.employee.model.booForm;
import com.increff.employee.model.orderitemForm;
import com.increff.employee.pojo.orderitemPojo;
import com.increff.employee.service.ApiException;
import com.increff.employee.service.orderitemService;
import com.increff.employee.util.DataConversionUtil;




@Service
public class orderItemDto {
   
    
        @Autowired
        private orderitemService service;
 
        public booForm Add(orderitemForm form) throws ApiException {
            orderitemPojo o=DataConversionUtil.convert(form);
            List<Object> p=service.checkitems(o,0);
            if ((int)p.get(0)==-1) {
                return DataConversionUtil.convert(0,"",0);
            }
            else if ((int)p.get(0)==-2) {
                return DataConversionUtil.convert(2,"",(int)p.get(1));
            }
            return DataConversionUtil.convert(1,(String)p.get(1),0);
        }
    
        
        public orderitemPojo Get( int id) throws ApiException {
            orderitemPojo p = service.getid(id);
            return p;
        }
        

        public void Update( int id, orderitemForm f) throws ApiException {
            orderitemPojo o=DataConversionUtil.convert(f);    
             service.update(id, o,f.getOld_q());
        }

        public void delete( int id) throws ApiException {
            service.delete(id);
        }
    
    }
    
