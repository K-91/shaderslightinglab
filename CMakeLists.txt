cmake_minimum_required(VERSION "3.14.0")

project("TeapotAD" LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

#get all cpps
file(GLOB CPPS CONFIGURE_DEPENDS
	"${CMAKE_CURRENT_SOURCE_DIR}/*.cpp"
)
#get all headerss
file(GLOB HEADERS CONFIGURE_DEPENDS
	"${CMAKE_CURRENT_SOURCE_DIR}/*.h"
	"${CMAKE_CURRENT_SOURCE_DIR}/*.hpp"
)
file(GLOB SHADERS CONFIGURE_DEPENDS
	"${CMAKE_CURRENT_SOURCE_DIR}/*.vert"
	"${CMAKE_CURRENT_SOURCE_DIR}/*.frag"
)




include_directories("${CMAKE_CURRENT_SOURCE_DIR}/glm/glm" "${CMAKE_CURRENT_SOURCE_DIR}/stb_image/stb_image" "${CMAKE_CURRENT_SOURCE_DIR}/GLFW/glfw-3.2.1.bin.WIN64/include/GLFW" )
link_directories("${CMAKE_CURRENT_SOURCE_DIR}/GLFW/glfw-3.2.1.bin.WIN64/lib-vc2015")


add_executable("${PROJECT_NAME}" "${CPPS}" "${HEADERS}" "${SHADERS}")


install(TARGETS "${PROJECT_NAME}" DESTINATION bin) #${CMAKE_INSTALL_PREFIX}/bin
install(FILES "TeapotAD.cpp" DESTINATION src)


target_link_libraries(${PROJECT_NAME} PRIVATE glfw3 opengl32)



# Group into "Source Files", "Header Files" and "Resource Files"
source_group("Source Files" FILES ${CPPS})
source_group("Header Files" FILES ${HEADERS})
source_group("Resource Files" FILES ${SHADERS})

set_property(DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR} PROPERTY VS_STARTUP_PROJECT ${PROJECT_NAME})
#no setting as startup project
	
set(CMAKE_SUPPRESS_REGENERATION true)
set_property(GLOBAL PROPERTY USE_FOLDERS ON)
