#version 430

in vec3 vertPos;
in vec3 N;
in vec3 lightPos;
in vec3 EyePos;
/*TODO:: Complete your shader code for a full Phong shading*/ 

uniform vec3 Kd;            // Diffuse reflectivity
uniform vec3 Ld;            // Diffuse light intensity
uniform float Transparency;
uniform bool Blinn;
uniform bool EnableSpecular;
// complete to a full phong shading
layout( location = 0 ) out vec4 FragColour;

void main() {


	//Calculate the light normal vector
	vec3 L = normalize(lightPos - vertPos);  //What is this code doing?

	//calculate Diffuse Light Intensity making sure it is not negative and is clamped 0 to 1  
	vec3 diffIntensity = Ld * max(dot(N,L), 0.f); 
	diffIntensity = clamp(diffIntensity, 0.f, 1.f);                                               // What is the role of clamp function? Why do we need it? 

	vec3 viewDir = normalize(EyePos - vertPos);

	float spec = 0.f;
	if(EnableSpecular){
		const float Pi = 3.14159265;
		const float Shininess = 16.0;
		if(Blinn){
			const float equaliser = ( 8.0 + Shininess ) / ( 8.0 * Pi ); 
			vec3 halfwayDir = normalize(L + viewDir); 
			spec = (equaliser * pow(max(dot(N, halfwayDir), 0.f), Shininess));
		}else{
			const float equaliser = ( 2.0 + Shininess ) / ( 2.0 * Pi ); 
			vec3 reflectDir = reflect(-L, N);
			spec = (equaliser * pow(max(dot(viewDir, reflectDir), 0.f), Shininess));
		}
	}

	vec3 ambient = Kd * 0.5f;
	//Multiply the Reflectivity by the Diffuse intensity
	FragColour = (vec4(((Kd * diffIntensity) + ambient + spec)/1.33f ,Transparency));
	

}
