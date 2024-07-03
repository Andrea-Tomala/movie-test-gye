import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'https://api.themoviedb.org/3';
  private api_key= 'b929aa64400d2add212f55f128094756';
  private authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTI5YWE2NDQwMGQyYWRkMjEyZjU1ZjEyODA5NDc1NiIsIm5iZiI6MTcxOTk0NzM3Ni42MDkzMDIsInN1YiI6IjY2ODQ0ZDJlZmJlYTA4MWNlMzc3NTBiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XDJGkhdew3SdTpm5-S3kSyzwe5jbfrItqCVS09Rpars'
  private headers = new HttpHeaders({
    'Authorization': this.authorization,
    'accept': 'application/json'
  });

  constructor(private http: HttpClient) { }

  /* getPopularMovies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc?api_key=${this.api_key}`,
      { headers: this.headers });
  } */
  getPopularMovies(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc?api_key=${this.api_key}`, { headers: this.headers });
  }

  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movie/${movieId}?language=en-US?api_key=${this.api_key}`, { headers: this.headers });
  }

  getMovieCredits(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movie/${movieId}/credits?language=en-US?api_key=${this.api_key}`, { headers: this.headers });
  }
}
