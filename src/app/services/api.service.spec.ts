import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        provideHttpClient(),           // ← Agregué esto
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch materias and update signal', async () => {
    const mockData = {
      data: [
        { id: 1, nombre: 'Matemáticas' },
        { id: 2, nombre: 'Español' }
      ]
    };

    const promise = service.getResource('materias');

    const req = httpMock.expectOne(`${environment.baseUrl}/materias`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);

    await promise;

    expect(service.materias()).toEqual(mockData.data);
    expect(service.loading()).toBe(false);
  });

  it('should handle errors gracefully', async () => {
    spyOn(console, 'error');

    const promise = service.getResource('companeros');

    const req = httpMock.expectOne(`${environment.baseUrl}/companeros`);
    req.error(new ErrorEvent('Network error'));

    await promise;

    expect(console.error).toHaveBeenCalled();
    expect(service.loading()).toBe(false);
  });
});