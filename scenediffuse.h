#ifndef SCENEDIFFUSE_H
#define SCENEDIFFUSE_H

#include "gl_core_4_3.hpp"

//#include <glfw3.h>
#include "GLFW/glfw-3.2.1.bin.WIN64/include/GLFW/glfw3.h"
#include "scene.h"
#include "glslprogram.h"

#include "vboteapot.h"
#include "vboplane.h"

#include "glm/glm/glm.hpp"

using glm::mat4;


namespace imat2908
{

class SceneDiffuse : public Scene
{
private:
    GLSLProgram prog;


	bool _blinn = true;
	bool _enableSpecular = true;
    int width, height;
 
	VBOTeapot* teapot;  //Teapot VBO
	VBOTeapot* teapot2;
	VBOPlane* plane;  //Plane VBO

    mat4 model; //Model matrix


    void setMatrices(QuatCamera camera); //Set the camera matrices

    void compileAndLinkShader(); //Compile and link the shader

public:
	
	bool blinn()const{return _blinn;};
	void blinn(bool x){_blinn = x;};
	bool enableSpecular()const{return _enableSpecular;};
	void enableSpecular(bool x){_enableSpecular = x;};



    SceneDiffuse(); //Constructor

	void setLightParams(QuatCamera camera); //Setup the lighting

    void initScene(QuatCamera camera); //Initialise the scene

    void update( float t ); //Update the scene

    void render(QuatCamera camera);	//Render the scene

    void resize(QuatCamera camera, int, int); //Resize
};

}

#endif // SCENEDIFFUSE_H
